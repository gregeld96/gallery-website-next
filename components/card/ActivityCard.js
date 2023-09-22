import { AiFillDelete } from 'react-icons/ai'
import UploadImageModalUpdate from '../modal/UploadImageUpdate';

function ActivityCard({
  backgroundImage,
  name,
  id,
  selectedSlug,
  slug,
  onDelete,
  open,
  onModal,
}) {
  return (
    <div className="bg-white h-max my-1 border rounded-xl text-black">
      <div className="mb-2" onClick={() => onModal(slug)}>
          <img src={`http://localhost:3000/${backgroundImage.replace('public/', "")}`} alt="" className="h-auto rounded-t-xl" />
      </div>
      <div className="my-2 text-center mx-auto">
        <p className="font-bold text-xs">{name}</p>
        <AiFillDelete color='red' className='w-full my-2' size={25 } onClick={onDelete} />
      </div>

      <UploadImageModalUpdate open={open} onClick={onModal} id={id} fileId={selectedSlug} section={"update"} />
    </div>
  );
}

export default ActivityCard;
