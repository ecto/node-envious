// Copyright 2011 Mark Bao
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function envious () {

  // defaults
  this.environments = {};

  // apply the environment
  // [param] strict: usually, giving an invalid environment name
  //                 would fall back to default. make true to
  //                 throw an error for an invalid env instead.
  this.apply = function(strict) {
    env = process.env.NODE_ENV;
    if (this[env]) {
      // environment matched
      return this[env];
    } else {
      // no environment matched
      if (env && strict) {
        // env defined, but not matched
        throw new Error('envious: couldn\'t find that environment');
      } else {
        // env is undefined/empty
        if (!this.default) {
          throw new Error('no default environment found');
        } else if (this.default && !this[this.default]) {
          // default not found
          throw new Error('envious: no configuration found for default environment `' + this.default + '`');
        } else if (this.default && this[this.default]) {
          // return default
          return this[this.default];
        }
      }
    }
  }
}

module.exports = new envious();
