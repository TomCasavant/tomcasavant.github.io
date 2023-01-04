module StringInflection
  module Methods
    module Snake
      extend Method
      @method_definition = proc {
        s = gsub(/([A-Z])/, '-\1')
        s.gsub!(/[\s\-_]+/, '_')
        s.sub!(/^_+/, '')
        s.downcase!
        s
      }
    end
  end
end
