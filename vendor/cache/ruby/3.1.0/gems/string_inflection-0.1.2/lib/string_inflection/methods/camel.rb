module StringInflection
  module Methods
    module Camel
      extend Method
      @method_definition = proc {
        s = gsub(/[\s\-_]+/, '_')
        s.gsub!(/_./){|s| s[1].upcase}
        s.sub!(/^./){|s| s.downcase}
        s
      }
    end
  end
end
