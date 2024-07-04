 import Month from '../Page/Month/index'
 import Year from '../Page/Year/index'
 import New from '../Page/New/index'
 import Layout from '../Page/Layout'
 import { createBrowserRouter } from 'react-router-dom'

const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[{
            path:'month',
            element:<Month/>
         },
         {
            path:'year',
            element:<Year/>
         }   
    ]
    },
    {
        path:'new',
        element:<New/>
    },
    
])
export default router