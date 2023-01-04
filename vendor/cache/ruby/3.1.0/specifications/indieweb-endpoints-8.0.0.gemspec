# -*- encoding: utf-8 -*-
# stub: indieweb-endpoints 8.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "indieweb-endpoints".freeze
  s.version = "8.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "bug_tracker_uri" => "https://github.com/indieweb/indieweb-endpoints-ruby/issues", "changelog_uri" => "https://github.com/indieweb/indieweb-endpoints-ruby/blob/v8.0.0/CHANGELOG.md", "rubygems_mfa_required" => "true" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Jason Garber".freeze]
  s.date = "2022-11-09"
  s.description = "Discover a URL\u2019s IndieAuth, Micropub, Microsub, and Webmention endpoints.".freeze
  s.email = ["jason@sixtwothree.org".freeze]
  s.homepage = "https://github.com/indieweb/indieweb-endpoints-ruby".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new([">= 2.7".freeze, "< 4".freeze])
  s.rubygems_version = "3.3.26".freeze
  s.summary = "Discover a URL\u2019s IndieAuth, Micropub, Microsub, and Webmention endpoints.".freeze

  s.installed_by_version = "3.3.26" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<http>.freeze, ["~> 5.0"])
    s.add_runtime_dependency(%q<link-header-parser>.freeze, ["~> 5.0"])
    s.add_runtime_dependency(%q<nokogiri>.freeze, [">= 1.13"])
  else
    s.add_dependency(%q<http>.freeze, ["~> 5.0"])
    s.add_dependency(%q<link-header-parser>.freeze, ["~> 5.0"])
    s.add_dependency(%q<nokogiri>.freeze, [">= 1.13"])
  end
end
