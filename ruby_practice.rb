require 'set'


class Language
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def to_s
    self.name
  end
end

def speak
  dweller = Proc.new do |tongue|
    if tongue[-1] != "n"
      tongue + "er"
    else
      tongue
    end
  end

  accents = ["NY", "British", "African"]
  accents.map! {|accent| dweller[accent]}
  accents
end

puts creole = Language.new("Creole")
puts speak()
