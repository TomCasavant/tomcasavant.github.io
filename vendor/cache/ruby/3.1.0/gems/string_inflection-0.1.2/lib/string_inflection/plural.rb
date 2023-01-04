module StringInflection
  module Plural
    refine ::String do
      include ::StringInflection::Methods::Plural[name: "to_plural"]
    end
  end
end
