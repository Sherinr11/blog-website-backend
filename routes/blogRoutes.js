
const router=require('express').Router();
const blogControllers=require('../controllers/blogControllers');
router.get('/readAllContent',blogControllers.readBlogs
    );
    router.get('/searchBlog',blogControllers.searchBlogs
    );
    router.post('/writeContent',blogControllers.writeBlogs
      
    )
    router.put('/updateBlog',blogControllers.updateBlogs
       
    );

    router.delete('/deleteBlog/:id/:key', blogControllers.deleteBlog);

    module.exports=router;