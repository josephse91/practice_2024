CREATE TEMPORARY TABLE topThree AS (
    SELECT 
        st.id, st.name, st.college_name,
        p.score, p.category,
        ROW_NUMBER() OVER (PARTITION BY p.category ORDER BY p.score DESC) AS 'row_num'
    FROM PARTICIPATIONS p
    LEFT JOIN STUDENTS st 
        ON st.id = p.student_id
);

SELECT tt.category, tt.id, tt.college_name, tt.name, tt.score
FROM topThree tt
WHERE tt.row_num <= 3

SELECT 
    o.id,
    YEAR(o.order_date) AS year,
    CASE
        WHEN MONTH(o.order_date) BETWEEN 1 AND 3 THEN "1st quarter"
        WHEN MONTH(o.order_date) BETWEEN 4 AND 6 THEN "2nd quarter"
        WHEN MONTH(o.order_date) BETWEEN 7 AND 9 THEN "3rd quarter"
        WHEN MONTH(o.order_date) BETWEEN 10 AND 12 THEN "4th quarter"
    END AS "quarter",
    o.type,
    o.price * o.quantity AS "total_price"
FROM orders o

WITH trackparts AS (
    SELECT
        ROW_NUMBER() OVER (PARTITION BY anonymous_id, user_id ORDER BY received_at DESC) AS 'anonym_id',
        ROW_NUMBER() OVER (PARTITION BY anonymous_id, user_id ORDER BY received_at ASC) AS 'last_null',
        ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY received_at DESC) AS 'first_notnull'
    FROM tracks t
)

SELECT t.anonym_id, tp.last_null, t.first_notnull
FROM (
    SELECT
        t.anonymous_id AS 'anonym_id',
        t.event_name AS 'last_null',
        t.event_name AS 'first_notnull',
        t.user_id AS 'user_id',
        ROW_NUMBER() OVER (PARTITION BY t.anonymous_id, t.user_id ORDER BY t.received_at DESC) AS 'anonym_id_row',
        ROW_NUMBER() OVER (PARTITION BY t.user_id ORDER BY t.received_at DESC) AS 'first_notnull_row'
    FROM tracks t
    LEFT JOIN (
        SELECT
            tln.anonymous_id AS 'anonym_id',
            tln.event_name AS 'last_null',
            tln.event_name AS 'first_notnull',
            tln.user_id AS 'user_id',
            ROW_NUMBER() OVER (PARTITION BY tln.anonymous_id, tln.user_id ORDER BY tln.received_at DESC) AS 'last_null_row', 
        FROM tracks tln
        WHERE tln.user_id IS NULL)
    ) tp ON tp.anonymous_id = t.anonymous_id
WHERE 
    t.anonym_id_row < 3 OR 
    tp.last_null_row = 1 OR 
    t.first_notnull_row = 1


SELECT 
    org.author AS 'author',
    org.book AS 'book'
FROM (
    SELECT
        lib.id,
        lib.author,
        lib.book,
        COUNT(*) OVER (PARTITION BY lib.author) AS 'num_of_books',
        ROW_NUMBER() OVER (PARTITION BY lib.author ORDER BY SUM((lib.total_number_of_pages - lib.pages_read) * lib.speed) ASC) AS 'quick_author_read',
        ROW_NUMBER() OVER (PARTITION BY lib.author ORDER BY (lib.total_number_of_pages - lib.pages_read) * lib.speed) AS 'quick_book_read'
    FROM book_library lib
) org
ORDER BY org.num_of_books DESC, org.quick_author_read ASC, org.quick_book_read, org.book
