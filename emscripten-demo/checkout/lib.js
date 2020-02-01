mergeInto(LibraryManager.library, {
  my_js: function (password) {
    window.localStorage.setItem(origin + '#password', password);

  },
});
