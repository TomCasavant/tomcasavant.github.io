require_relative '../singulars'

module StringInflection
  module Methods
    module Plural
      SEPARATOR = /[^a-zA-Z0-9]|[a-z0-9](?=[A-Z])/
      SUFFIXES = [
        [/([sxz])$/i, '\1es', '\1ES'],
        [/y$/i, 'ies', 'IES'],
        [/(m)an$/i, '\1en', '\1EN'],
      ]
      extend Method
      @method_definition = proc {|options = {}|
        a = split(SEPARATOR)
        s = a.last.dup
        dicts = options[:dicts] || [StringInflection::SINGULARS]
        with = options[:up] ? 2 : 1
        if (begin
          downcased = s.downcase
          diff = nil
          dicts.any?{|dict| diff = dict[downcased]}
          diff && (s = s[0..(-1 - diff[0])] + diff[with])
        end)
        else
          s += (options[:up] ? 'S' : 's') unless SUFFIXES.any?{|i| s.sub!(i[0], i[with])}
        end
        (self[0, self.size - a.last.size] || '') + s
      }
    end
  end
end
