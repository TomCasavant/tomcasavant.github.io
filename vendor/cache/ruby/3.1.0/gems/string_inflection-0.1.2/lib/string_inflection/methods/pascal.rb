module StringInflection
  module Methods
    module Pascal
      extend Method
      @method_definition = proc {
        s = gsub(/[\s\-_]+/, '_')
        s.gsub!(/_./){|s| s[1].upcase}
        s.sub!(/^./){|s| s.upcase}
        s
      }
    end
  end
end
