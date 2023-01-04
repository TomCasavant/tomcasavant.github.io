require "string_inflection/version"

module StringInflection
  autoload :Cases, __dir__ + '/string_inflection/cases'
  autoload :Method, __dir__ + '/string_inflection/method'
  autoload :Methods, __dir__ + '/string_inflection/methods'
  autoload :Plural, __dir__ + '/string_inflection/plural'
  autoload :Singular, __dir__ + '/string_inflection/singular'

  refine ::String do
    include ::StringInflection::Methods::Camel[name: "to_camel"]
    include ::StringInflection::Methods::Kebab[name: "to_kebab"]
    include ::StringInflection::Methods::Pascal[name: "to_pascal"]
    include ::StringInflection::Methods::Snake[name: "to_snake"]
    include ::StringInflection::Methods::Singular[name: "to_singular"]
    include ::StringInflection::Methods::Plural[name: "to_plural"]
  end
end
