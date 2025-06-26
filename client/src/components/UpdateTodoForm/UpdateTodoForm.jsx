import React from 'react';
import styles from './UpdateTodoForm.module.css';
import Option from '../Option/Option';
import { formatDateValues } from '../../utils/updateTodoFormHelpers';
import { ENDPOINT } from '../../constants';
import { DAYS, MONTHS, YEARS } from '../../constants';


function UpdateTodoForm({ todo, onSubmit }) { 
  const [formData, setFormData] = React.useState(todo);
  
  React.useEffect(() => { 
    setFormData(todo);
  }, [todo]);

  function handleChange(event) { 
    const { name, value } = event.target;
    setFormData((currentFormData) => ({...currentFormData, [name]: value}));
  }

  function markTodoAsComplete(event) { 
    const nextFormData = {
      ...formData,
      completed: true,
    };
    setFormData(nextFormData);
    handleSubmit(event, nextFormData);
  }

  async function handleSubmit(event, formData) {
    event.preventDefault();
    
    const todoData = formatDateValues(formData);

    try {
      const response = await fetch(`${ENDPOINT}/${todoData.id}`, {
        method: "PUT",
        body: JSON.stringify(todoData),
        headers: {"Content-Type": "application/json; charset=UTF-8"},
      });

      if (!response.ok) { 
        throw new Error(`${response.status} ${response.textStatus}`);
      }

      const todo = await response.json();
      onSubmit(todo);
    } catch (error) {
      console.log(`Encountered an error: ${error.message}`);
    }
  }


  return (
    <div className={styles.formModal}>
      <form
        className={styles.form}
        onSubmit={(event) => handleSubmit(event, formData)}
      >
        <fieldset>
          <ul>
            <li
              className={styles.listItem}
            >
              <label
                htmlFor="title"
                className={styles.formLabel}
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className={styles.textInput}
                placeholder="Item 1"
                value={formData.title}
                onChange={handleChange}
              />
            </li>
            <li
              className={styles.listItem}
            >
              <label
                htmlFor="due"
                className={styles.formLabel}
              >
                Due Date
              </label>
              <div className={ styles.date }>
                <select
                  id="due"
                  name="day"
                  className={styles.selectDate}
                  value={formData.day}
                  onChange={handleChange}
                >
                  <option>Day</option>
                  {DAYS.map(({ title, value }) => ( 
                    <Option
                      key={value}
                      title={title}
                      value={value}
                    />
                  ))}
                </select>  /
                <select
                  id="due_month"
                  name="month"
                  className={styles.selectDate}
                  value={formData.month}
                  onChange={handleChange}
                >
                  <option>Month</option>
                  {MONTHS.map(({ title, value }) => (
                    <Option
                      key={value}
                      title={title}
                      value={value}
                    />
                  ))}
                </select> /
                <select
                  id="due_year"
                  name="year"
                  className={styles.selectDate}
                  placeholder="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option>Year</option>
                  {YEARS.map(({ title, value }) => (
                    <Option
                      key={value}
                      title={title}
                      value={value}
                    />
                  ))}
                </select>
              </div>
            </li>
            <li
              className={styles.listItem}
            >
              <label
                htmlFor="description"
                className={styles.formLabel}
              >
                Description
              </label>
              <textarea
                id="description"
                cols="50"
                name="description"
                className={styles.textArea}
                rows="7"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              >
              </textarea>
            </li>
            <li
              className={styles.listItem}
            >
              <input
                type="submit"
                value="Save"
                className={styles.submitInput}
              />
              <button
                type="button"
                name="complete"
                className={styles.button}
                onClick={markTodoAsComplete}
              >
                Mark As Complete
              </button>
            </li>
          </ul>
        </fieldset>
        </form>
    </div>
  );
}


export default UpdateTodoForm;