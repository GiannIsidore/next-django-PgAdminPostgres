import { Label } from '@radix-ui/react-label'
import React from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { addPublisher } from '@/app/action/action'

const  AddPublisher = () => {
  return (
      <form action={addPublisher}>
        <Label>
              Name:
          </Label>
          <Input type='text' placeholder='name' name='name' />
          <Label>
              Address:
          </Label>
          <Textarea placeholder='address' name='address' />
          <Label>
              Phone:
          </Label>
          <Input type='text' placeholder='phone' name='phone' />
            <Label>
              Email:
          </Label>
          <Input type='text' placeholder='email' name='email' />
            <Button type="submit">Submit</Button>

      </form>
  )
}

export default AddPublisher
