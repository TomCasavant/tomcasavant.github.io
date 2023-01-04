module StringInflection
  module Cases
    refine ::String do
      include ::StringInflection::Methods::Camel[name: "to_camel"]
      include ::StringInflection::Methods::Kebab[name: "to_kebab"]
      include ::StringInflection::Methods::Pascal[name: "to_pascal"]
      include ::StringInflection::Methods::Snake[name: "to_snake"]
    end
  end
end
