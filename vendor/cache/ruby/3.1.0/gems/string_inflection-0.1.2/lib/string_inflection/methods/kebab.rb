module StringInflection
  module Methods
    module Kebab
      extend Method
      @method_definition = proc {
        s = gsub(/([A-Z])/, '-\1')
        s.gsub!(/[\s\-_]+/, '-')
        s.sub!(/^-+/, '')
        s.downcase!
        s
      }
    end
  end
end
