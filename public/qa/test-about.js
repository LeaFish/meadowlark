/**
 * Created by yezhiyu on 16/12/28.
 */
suite('"About" Page Tests', function(){
    test('page should contain link to contact page', function(){
        assert($('a[href="/contact"]').length);
    });
});
