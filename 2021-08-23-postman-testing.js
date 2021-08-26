// 2021-08-23 API Design Workshop
// @mamund

// protocol testing
pm.test('Status is 200', function() {
    pm.expect(pm.response.code).to.equal(200);
});

pm.test("Content-Type is application/forms+json", function() {
   var hdr = pm.response.headers.get('content-type');
   pm.expect(hdr).to.include('*/*');   // should be: 'application/forms+json'
});

// testing structure
var body = pm.response.json();

pm.test('Root element is home', function() {
    pm.expect(body.home).is.not.null;
});

pm.test('metadata array contains name and value properties', function() {
    pm.expect(body.home.metadata).to.be.an('array');
    var collection = body.home.metadata;
    var properties = ["name","value"];
    collection.forEach(function(item) {
        properties.forEach(function(prop) {
            pm.expect(item).to.have.property(prop);
        });      
    });
});

// testing content
pm.test('title metadata property contains BigCo', function() {
    var collection = body.home.metadata;
    var item = collection.find(x=> x.name = 'title');
    pm.expect(item).to.have.property('value');
    pm.expect(item.value).to.include('SmallCo'); // should be 'BigCo'
});

// EOF

