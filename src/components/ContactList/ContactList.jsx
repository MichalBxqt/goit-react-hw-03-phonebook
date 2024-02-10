import css from './ContactList.module.css';
export const ContactList = props => {
  return (
    <ul>
      {props.contacts.map(elem => {
        return (
          <li key={elem.id}>
            <span style={{ display: 'line-block', marginRight: 16 }}>
              {elem.name}: {elem.number}
            </span>
            <button
              id={elem.id}
              onClick={() => props.handleDelete(elem.id)}
              className={css.btn}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};