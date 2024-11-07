import { addAuthor } from '@/app/action/action'

import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const AddAuthor = () => {

  return (
    <div>
        <form action={addAuthor}>
            <Label>
                Name:
            </Label>
            <Input type='text' placeholder='name' name='name' />
            <Label>
                    Bio:
            </Label>
            <Textarea placeholder='bio' name='bio' />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AddAuthor
