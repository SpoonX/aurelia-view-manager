<a name="0.1.0"></a>
# 0.1.0 (2016-07-27)


### Bug Fixes

* **config:** check if configCallback is a function, warn if not ([ec2ab32](https://github.com/SpoonX/aurelia-view-manager/commit/ec2ab32))
* **config:** uses correct export from aurelia-logging ([a5c2729](https://github.com/SpoonX/aurelia-view-manager/commit/a5c2729))
* **decorators:** exports resolved view from aurelia-view.js ([7e84562](https://github.com/SpoonX/aurelia-view-manager/commit/7e84562))
* **decorators:** properly decorates the constructor and uses useView ([1ab6864](https://github.com/SpoonX/aurelia-view-manager/commit/1ab6864))
* **logging:** logging using aurelia-logging instead of console ([dc4d135](https://github.com/SpoonX/aurelia-view-manager/commit/dc4d135))
* **resolve:** the resolving of the location template happens recursively, meaning that nested templates are supported ([a007685](https://github.com/SpoonX/aurelia-view-manager/commit/a007685))
* **viewResolver:** returns the mapped value of the namespace ([893a041](https://github.com/SpoonX/aurelia-view-manager/commit/893a041))


### Features

* **project:** Added travis ([686fff2](https://github.com/SpoonX/aurelia-view-manager/commit/686fff2))
* **project:** new build with typings and bundled ([c3b6099](https://github.com/SpoonX/aurelia-view-manager/commit/c3b6099))


### BREAKING CHANGES

* project: resolved-view decorator bundled. use `import 'resolved-view' from 'aurelia-view-manager' now



### 0.0.5 (2016-06-20)


#### Bug Fixes

* **config:**
  * uses correct export from aurelia-logging ([a5c2729b](https://github.com/SpoonX/aurelia-view-manager/commit/a5c2729b3ac8c5c80f39847a420a2210204db08d))
  * check if configCallback is a function, warn if not ([ec2ab329](https://github.com/SpoonX/aurelia-view-manager/commit/ec2ab3299df459a169bae04be5c76e0ec22b737e))
* **decorators:**
  * properly decorates the constructor and uses useView ([1ab6864c](https://github.com/SpoonX/aurelia-view-manager/commit/1ab6864cffe335a20b4890ecdc8fa57a035f8b27))
  * exports resolved view from aurelia-view.js ([7e84562c](https://github.com/SpoonX/aurelia-view-manager/commit/7e84562cd40bf497710443e514bd60863c62aa7a))
* **logging:** logging using aurelia-logging instead of console ([dc4d1359](https://github.com/SpoonX/aurelia-view-manager/commit/dc4d135919fa4365b39672f260441d38b02e1aab))
* **resolve:** the resolving of the location template happens recursively, meaning that nested  ([a0076858](https://github.com/SpoonX/aurelia-view-manager/commit/a007685865befcd8e24487c3ee6a48d0c8ba6810))
* **viewResolver:** returns the mapped value of the namespace ([893a0416](https://github.com/SpoonX/aurelia-view-manager/commit/893a0416d98981d8b6d9cb1399d332a6a3079249))


#### Features

* **project:** Added travis ([686fff21](https://github.com/SpoonX/aurelia-view-manager/commit/686fff21d42e40a2b6425cd3eefcd9972424adfc))


### 0.0.4 (2016-06-07)


#### Bug Fixes

* **decorators:**
  * properly decorates the constructor and uses useView ([1ab6864c](https://github.com/SpoonX/aurelia-view-manager/commit/1ab6864cffe335a20b4890ecdc8fa57a035f8b27))
  * exports resolved view from aurelia-view.js ([7e84562c](https://github.com/SpoonX/aurelia-view-manager/commit/7e84562cd40bf497710443e514bd60863c62aa7a))
* **viewResolver:** returns the mapped value of the namespace ([893a0416](https://github.com/SpoonX/aurelia-view-manager/commit/893a0416d98981d8b6d9cb1399d332a6a3079249))


#### Features

* **project:** Added travis ([686fff21](https://github.com/SpoonX/aurelia-view-manager/commit/686fff21d42e40a2b6425cd3eefcd9972424adfc))


### 0.0.3 (2016-06-03)


#### Bug Fixes

* **viewResolver:** returns the mapped value of the namespace ([893a0416](https://github.com/SpoonX/aurelia-view-manager/commit/893a0416d98981d8b6d9cb1399d332a6a3079249))


#### Features

* **project:** Added travis ([686fff21](https://github.com/SpoonX/aurelia-view-manager/commit/686fff21d42e40a2b6425cd3eefcd9972424adfc))


