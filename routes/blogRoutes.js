
const router=require('express').Router();
const blogControllers=require('../controllers/blogControllers');
// const blogModel=require('../controllers/blogExpressController');
router.get('/readAllContentsync',blogControllers.readBlogs
    );
    router.get('/searchBlogsync',blogControllers.searchBlogs
    );
    router.post('/writeContentsync',blogControllers.writeBlogs
      
    )
    router.put('/updateBlogsync',blogControllers.updateBlogs
       
    );
    router.delete('/deleteBlogsync/:id',blogControllers.deleteBlog);
   
    module.exports=router;