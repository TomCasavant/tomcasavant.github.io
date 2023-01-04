require_relative '../plurals'

module StringInflection
  module Methods
    module Singular
      SEPARATOR = /[^a-zA-Z0-9]|[a-z0-9](?=[A-Z])/
      SUFFIXES = [
        [/([hosxz])es$/i, '\1', '\1'],
        [/ies$/i, 'y', 'Y'],
        [/(m)en$/i, '\1an', '\1AN'],
      ]
      extend Method
      @method_definition = proc {|options = {}|
        a = split(SEPARATOR)
        s = a.last.dup
        dicts = options[:dicts] || [StringInflection::PLURALS]
        with = options[:up] ? 2 : 1
        if (begin
          downcased = s.downcase
          diff = nil
          dicts.any?{|dict| diff = dict[downcased]}
          diff && (s = s[0..(-1 - diff[0])] + diff[with])
        end)
        else
          s.chop! unless SUFFIXES.any?{|i| s.sub!(i[0], i[with])}
        end
        (self[0, self.size - a.last.size] || '') + s
      }
    end
  end
end
