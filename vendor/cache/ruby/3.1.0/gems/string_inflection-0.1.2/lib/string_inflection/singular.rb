module StringInflection
  module Singular
    refine ::String do
      include ::StringInflection::Methods::Singular[name: "to_singular"]
    end
  end
end
