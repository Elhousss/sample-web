/**
 * Created by Asebban on 08/08/2016.
 */
(function() {
  angular.module("sample").filter('phonenumber', function () {

    // Create the return function and set the required parameter as well as an optional paramater
    return function (input) {

      if (!angular.isDefined(input))
        return;

      if (isNaN(input))
        return input;

      var prefix = input.substring(0, 4);
      if (prefix.length == 4)
        prefix = "(" + prefix + ") ";

      var suffix = input.substring(4);

      return prefix + suffix;
    }
  });
})();
