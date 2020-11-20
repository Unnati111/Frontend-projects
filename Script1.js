// JavaScript source code
angular.module("myapp", [])
    .controller("myctrl", function ($scope, $http, $locale) {

        $http.get("http://starlord.hackerearth.com/recipe").then(function (response) {
            $scope.ramendetails = response.data;
            for (x in $scope.ramendetails) {
                $scope.ramendetails[x]["selected"] = false;
                $scope.ramendetails[x]["count"] = 0;
            }
            $scope.copydummy = response.data;
            $scope.allrecipes = $scope.ramendetails;
            $scope.keyname = "nameistrue";
            $scope.sortrecipe($scope.keyname);
            console.log($scope.allrecipes);
        },
            function (data) {
                alert("error getting data from backend");
            })
        $scope.resetdata = function () {
            $scope.ramendetails = $scope.copydummy;
            for (x in $scope.ramendetails) {
                $scope.ramendetails[x]["selected"] = false;
                $scope.ramendetails[x]["count"] = 0;
            }
            console.log($scope.ramendetails);
        };
        // $scope.resetdata();
        $scope.finalamount = 0;
        var reA = /[^a-zA-Z]/g;
        var reN = /[^0-9]/g;
        // $scope.allrecipes = $scope.ramendetails;

        $scope.searchby = 'name';

        $scope.nomsg = "No Items in the Cart";

        $scope.cardview = true;
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

            var href = $(e.target).attr('href');
            var $curr = $(".process-model  a[href='" + href + "']").parent();

            $('.process-model li').removeClass();

            $curr.addClass("active");
            $curr.prevAll().addClass("visited");
        });
        $scope.onpayment = function (x) {
            var currentitem = x;
            console.log(currentitem);
            var index = $scope.ramendetails.findIndex(item => item.id === currentitem.id);
            $scope.ramendetails[index].selected = true;
            $scope.ramendetails[index].count += 1;
            console.log($scope.allrecipes);
        };
        $scope.incrementvalue = function (x) {
            var currentitem = x;
            console.log(currentitem);
            var index = $scope.ramendetails.findIndex(item => item.id === currentitem.id);
            if (index !== -1) {
                $scope.ramendetails[index].count += 1;
            }
            if ($scope.cart != []) {
                $scope.finalamount = 0;
                for (var x in $scope.cart) {
                    $scope.cart[x]["total"] = ($scope.cart[x].count * $scope.cart[x].price);
                  
                    $scope.finalamount += ($scope.cart[x]["total"]);
                  
                }
                $scope.finalamount =$scope.finalamount.toFixed(2);
            }
            console.log($scope.allrecipes);
        };
        $scope.decrementvalue = function (x) {
            var currentitem = x;
            console.log(currentitem);
            var index = $scope.ramendetails.findIndex(item => item.id === currentitem.id);
            //s  previouscount = $scope.ramendetails[index].count;
            if ($scope.ramendetails[index].count > 0) {
                $scope.ramendetails[index].count -= 1;
            }
            if ($scope.ramendetails[index].count === 0) {
                $scope.ramendetails[index].selected = false;
                var indexincart = $scope.cart.findIndex(item => item.id === currentitem.id);
                $scope.cart.splice(indexincart,1);

            }
            if ($scope.cart != []) {
                $scope.finalamount = 0;
                for (var x in $scope.cart) {
                    $scope.cart[x]["total"] = ($scope.cart[x].count * $scope.cart[x].price);

                    $scope.finalamount += ($scope.cart[x]["total"]);
                 
                }
                $scope.finalamount =$scope.finalamount.toFixed(2);
              
            }
            if ($scope.cart.length == 0)
                $scope.no = true;
            console.log($scope.no); 
            console.log($scope.ramendetails);
            console.log($scope.cart);
        };
        $scope.checkout = function () {
            $scope.cart = [];
            $scope.finalamount = 0;
            for (var i in $scope.ramendetails) {
                if ($scope.ramendetails[i].selected == true)
                    $scope.cart.push($scope.ramendetails[i]);

            }
            if ($scope.cart) {
                var len = $scope.cart.length;
            }
            if (len!=0) {
                for (var x in $scope.cart) {

                    $scope.cart[x]["total"] = ($scope.cart[x].count * $scope.cart[x].price);
                    $scope.finalamount += ($scope.cart[x]["total"]);
                
                }
                $scope.finalamount =$scope.finalamount.toFixed(2);
                console.log($scope.cart);
                $scope.no = false;
            }
            else if(len==0) {
               
                $scope.no = true;
            }
            $scope.paymentview = true;
            console.log($scope.no);
            $scope.cardview = false;
            $scope.step1 = true;
            //$scope.resetdata();
        };
        $scope.gettocardview = function () {
            $scope.paymentview = false;
            $scope.step2 = false;
            $scope.step3 = false;
            $scope.success = false;
            $scope.failure = false;
            $scope.cardview = true;
            $scope.search = '';
            $scope.searchitem('');
            $scope.cart = [];
            $scope.success = false;
            $scope.failure = false;
            $scope.cc = {};
            $scope.o = {};
        };
        $scope.searchbychange = function (searchby) {
            $scope.searchby = searchby;
            console.log(searchby);
            $scope.search = '';
            $scope.searchitem($scope.search);
        }
        $scope.searchitem = function (search) {
            $scope.filteredjson = [];
            $scope.allrecipes = $scope.ramendetails;
            var searchlower = search.toLowerCase();
            console.log(searchlower);
            if (search) {
                for (var x in $scope.ramendetails) {
                    var str = JSON.stringify($scope.ramendetails[x].name);
                    var strprice = JSON.stringify($scope.ramendetails[x].price);
                    var strcat = JSON.stringify($scope.ramendetails[x].category);
                    console.log(str);
                    console.log(strprice);
                    console.log(strcat);
                    if ($scope.searchby == 'name' && str && str.toLowerCase().includes(searchlower)) {
                        $scope.filteredjson.push($scope.ramendetails[x]);
                    }
                    else if ($scope.searchby == 'price' && strprice && strprice.includes(searchlower)) {
                        $scope.filteredjson.push($scope.ramendetails[x]);
                    }
                    else if ($scope.searchby == 'category' && strcat && strcat.toLowerCase().includes(searchlower)) {
                        $scope.filteredjson.push($scope.ramendetails[x]);
                    }
                    console.log($scope.filteredjson);
                }
                console.log($scope.filteredjson);
                $scope.allrecipes = $scope.filteredjson;
            }
            else {
                $scope.allrecipes = $scope.ramendetails;
            }
        }


        function sortAlphaNum(a, b) {
            var key = $scope.sortKey;
            var aA = a[key].toLowerCase().replace(reA, "");
            var bA = b[key].toLowerCase().replace(reA, "");
            if (aA === bA) {
                var aN = parseInt(a[key].replace(reN, ""), 10);
                var bN = parseInt(b[key].replace(reN, ""), 10);
                return aN === bN ? 0 : aN > bN ? 1 : -1;
            } else {
                return aA > bA ? 1 : -1;
            }
        }



        $scope.sortrecipe = function (keyname) {
            var part = keyname.split("is");
            console.log(part);
            $scope.sortKey = part[0];
            $scope.isAscending = part[1];
            if ($scope.allrecipes != null && $scope.allrecipes != undefined) {
                if ($scope.isAscending === "false") {
                    $scope.allrecipes = $scope.allrecipes.sort(sortAlphaNum).reverse();
                    $scope.ramendetails = $scope.allrecipes;
                } else {
                    $scope.allrecipes = $scope.allrecipes.sort(sortAlphaNum);
                    $scope.ramendetails = $scope.allrecipes;

                }
            }
        };
        
        $scope.paymentstep2 = function () {

            $scope.step2 = true;
            $scope.step1 = false;
        }

        $scope.currentYear = new Date().getFullYear().toString();
        $scope.currentMonth = new Date().getMonth() + 1
        $scope.months = $locale.DATETIME_FORMATS.MONTH
        $scope.cc = { type: undefined }
        $scope.o = {};
        $scope.save = function (data) {
           // console.log(data);
            var cardData = JSON.stringify(data);
            console.log(cardData);
            var key = "23232124232121dsdsd";
            var hashed = CryptoJS.SHA1(key).toString();
            console.log(hashed);
            //this encrypted data can be sent to the server...and decrypted there.
            var encrypted = CryptoJS.AES.encrypt(cardData,hashed);

            //decryption process:
            /*var decrypted = CryptoJS.AES.decrypt(encrypted, hashed);
            var msg = decrypted.toString(CryptoJS.enc.Utf8);
            console.log(msg);*/
     
            $scope.step3 = true;
            $scope.step2 = false;
            $scope.otpview = true;
            $scope.data = data;
      
        }
        $scope.verifyotp = function () {
            $scope.otpview = false;
            $scope.otp = $scope.o.field1 + $scope.o.field2 + $scope.o.field3 + $scope.o.field4 + $scope.o.field5 + $scope.o.field6;
            console.log($scope.otp);
            if ($scope.otp === "123456") {
                $scope.success = true;

            }
            else {
                $scope.failure = true;}
        }
        $scope.placedorder = function () {
            if ($scope.success === true) {
                $scope.resetdata();
            }
            else {

            }
            $scope.cardview = true;
            $scope.paymentview = false;
            $scope.step3 = false;
            $scope.success = false;
            $scope.failure = false;
            $scope.cc = {};
            $scope.o = {};
        }

    });


angular.module('myapp').directive
    ('creditCardType'
        , function () {
            var directive =
            {
                require: 'ngModel'
                , link: function (scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(function (value) {
                        scope.cc.type =
                            (/^5[1-5]/.test(value)) ? "mastercard"
                                : (/^4/.test(value)) ? "visa"
                                    : (/^3[47]/.test(value)) ? 'amex'
                                        : (/^6011|65|64[4-9]|622(1(2[6-9]|[3-9]\d)|[2-8]\d{2}|9([01]\d|2[0-5]))/.test(value)) ? 'discover'
                                            : undefined
                        ctrl.$setValidity('invalid', !!scope.cc.type)
                        return value
                    })
                }
            }
            return directive
        }
    )




