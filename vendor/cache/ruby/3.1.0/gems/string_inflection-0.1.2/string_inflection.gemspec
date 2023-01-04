# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'string_inflection/version'

Gem::Specification.new do |spec|
  spec.name          = "string_inflection"
  spec.version       = StringInflection::VERSION
  spec.authors       = ["mosop"]
  spec.email         = [""]
  spec.licenses      = ['MIT']

  spec.summary       = %q{A yet another Ruby library for string inflection.}
  spec.homepage      = "https://github.com/mosop/string_inflection-ruby"

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features|submodules)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.0"
end
