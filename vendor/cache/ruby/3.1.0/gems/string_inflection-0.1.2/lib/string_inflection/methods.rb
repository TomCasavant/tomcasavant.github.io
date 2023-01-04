module StringInflection
  module Methods
    autoload :Camel, __dir__ + '/methods/camel'
    autoload :Kebab, __dir__ + '/methods/kebab'
    autoload :Pascal, __dir__ + '/methods/pascal'
    autoload :Plural, __dir__ + '/methods/plural'
    autoload :Singular, __dir__ + '/methods/singular'
    autoload :Snake, __dir__ + '/methods/snake'
  end
end
