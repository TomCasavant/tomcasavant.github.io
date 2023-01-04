module StringInflection
  module Method
    def [](options)
      name = options[:name]
      mod_name = "NAMES_#{name}"
      return const_get(mod_name) if const_defined?(mod_name)
      mod = Module.new
      const_set mod_name, mod
      mod.__send__ :define_method, name, &@method_definition
      mod
    end
  end
end
