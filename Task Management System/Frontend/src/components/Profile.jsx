
import { useSelector } from 'react-redux'

function Profile() {
    const {user} = useSelector((state)=>state.user)
  return (
    <div className='h-full w-full flex  items-center mt-4 flex-col shadow-3xl rounded-md'>
        <div>
            <span className='text-slate-800 text-xl font-bold p-2 m-2'>User Name:</span><span>{user?.username}</span>
        </div>
        <div>
            <span className='text-slate-800 text-xl font-bold p-2 m-2'>Email:</span><span>{user?.email}</span>
        </div>
        <div>
            <span className='text-slate-800 text-xl font-bold p-2 m-2'>Role:</span><span>{user?.role}</span>
        </div>
    </div>
  )
}

export default Profile