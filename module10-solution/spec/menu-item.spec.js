describe('menuService', function () {

  var menuService;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should return menu item with short name L1', function () {
    $httpBackend.whenGET(ApiPath + '/menu_items/L/menu_items/0.json').respond(
      {
        "description": "chunks of chicken, breaded and deep-fried with sauce containing orange peels; white meat by request: for pint $1 extra, for large $2 extra",
        "name": "Orange Chicken",
        "price_large": 9.75,
        "short_name": "L1"
      }
    );
    menuService.getMenuItem('L', '0').then(function (response) {
      expect(response).toEqual(
        {
          "description": "chunks of chicken, breaded and deep-fried with sauce containing orange peels; white meat by request: for pint $1 extra, for large $2 extra",
          "name": "Orange Chicken",
          "price_large": 9.75,
          "short_name": "L1"
        }
      );
    });
    $httpBackend.flush();
  });
  
});