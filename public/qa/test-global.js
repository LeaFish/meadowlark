/**
 * Created by yezhiyu on 16/12/28.
 */
suite('Global Tests', function(){
    test('page has a valid title', function(){
        assert(document.title && document.title.match(/\S/) &&
            document.title.toUpperCase() !== 'TODO');
    }); });
