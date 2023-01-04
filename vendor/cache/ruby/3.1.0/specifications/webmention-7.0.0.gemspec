# -*- encoding: utf-8 -*-
# stub: webmention 7.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "webmention".freeze
  s.version = "7.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "bug_tracker_uri" => "https://github.com/indieweb/webmention-client-ruby/issues", "changelog_uri" => "https://github.com/indieweb/webmention-client-ruby/blob/v7.0.0/CHANGELOG.md", "rubygems_mfa_required" => "true" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Jason Garber".freeze]
  s.date = "2022-11-10"
  s.description = "A Ruby gem for sending and verifying Webmention notifications.".freeze
  s.email = ["jason@sixtwothree.org".freeze]
  s.homepage = "https://github.com/indieweb/webmention-client-ruby".freeze
  s.licenses = ["Apache-2.0".freeze]
  s.required_ruby_version = Gem::Requirement.new([">= 2.7".freeze, "< 4".freeze])
  s.rubygems_version = "3.3.26".freeze
  s.summary = "Webmention notification client".freeze

  s.installed_by_version = "3.3.26" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<http>.freeze, ["~> 5.0"])
    s.add_runtime_dependency(%q<indieweb-endpoints>.freeze, ["~> 8.0"])
    s.add_runtime_dependency(%q<nokogiri>.freeze, [">= 1.13"])
  else
    s.add_dependency(%q<http>.freeze, ["~> 5.0"])
    s.add_dependency(%q<indieweb-endpoints>.freeze, ["~> 8.0"])
    s.add_dependency(%q<nokogiri>.freeze, [">= 1.13"])
  end
end
