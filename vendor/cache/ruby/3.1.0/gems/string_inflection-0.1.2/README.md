# StringInflection

A yet another Ruby library for string inflection.

[![Build Status](https://travis-ci.org/mosop/string_inflection-ruby.svg?branch=master)](https://travis-ci.org/mosop/string_inflection-ruby)

## Benefits

* No more Active Support in your Gemfiles/gemspecs only for inflection.
* A clean way - the Ruby's refinement.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'string_inflection'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install string_inflection

## Usage

```ruby
require "string_inflection"
using StringInflection

'foo bar'.to_camel # 'fooBar'
'foo bar'.to_kebab # 'foo-bar'
'foo bar'.to_pascal # 'FooBar'
'foo bar'.to_snake # 'foo_bar'
'data'.to_singular # 'datum'
'child'.to_plural # 'children'
```

## Upper Case Replacement

With the `:up` option, `#to_singular` / `#to_plural` replaces a string with upper case letters.

```ruby
'DATA'.to_singular(up: true) # 'DATUM'
'CHILD'.to_plural(up: true) # 'CHILDREN'
```

Note: `:up` affects only a replaced substring.

```ruby
'data'.to_singular(up: true) # 'datUM'
'child'.to_plural(up: true) # 'childREN'
```

## Refinement Modules

For performance improvement, the inflection methods are separated into several modules. Use ones of the modules as needed.

| module | methods |
| :-- | :-- |
| StringInflection::Cases | to_camel, to_kebab, to_pascal, to_snake |
| StringInflection::Singular | to_singular |
| StringInflection::Plural | to_plural |
| StringInflection | all the methods |

## Special Thanks

### [Automatically Generated Inflection Database (AGID)](http://wordlist.aspell.net/agid-readme/)

The handy database by Kevin Atkinson and other authors is significantly useful to generate irregular singular/plural forms. You can see the license in [README](submodules/agid/src/ext/agid/README).

## Release Notes

* v0.1.2
  * Upper Case Replacement

## Authors

[mosop](http://github.com/mosop) - creator, maintainer
