import { Item, Text, Btn } from './ContactItem.styled';

const ContactItem = ({ id, name, number, deleteContact }) => {
  return (
    <Item id={id}>
      <Text>
        {name}: {number}
      </Text>
      <Btn type="button" onClick={() => deleteContact(id)}>
        Delete
      </Btn>
    </Item>
  );
};

export default ContactItem;
