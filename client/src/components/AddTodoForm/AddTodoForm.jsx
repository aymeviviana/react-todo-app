import React from 'react';
import styles from './AddTodoForm.module.css';
import Option from '../Option/Option';
import { ENDPOINT } from '../../constants';
import { DAYS, MONTHS, YEARS } from "../../constants";

function AddTodoForm({ onSubmit }) { 
  const [formData, setFormData] = React.useState(
    {
      title: "",
      day: "",
      month: "",
      year: "",
      completed: false,
      description: ""
    });
  
  function handleChange(event) { 
    const { name, value } = event.target;
    setFormData((currentFormData) => ({...currentFormData, [name]: value}));
  }
  
  async function handleAddTodo(event) { 
    event.preventDefault();

    if (formData.title.length < 3) { 
      window.alert("Please add a title that's at least 3 characters long =)");
      return;
    }
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json; charset=UTF-8'},
      })

      if (!response.ok) { 
        throw new Error(`${response.status}: ${response.statusText}`)
      }

      const todo = await response.json();
      onSubmit(todo);
    } catch (error) { 
      console.log(`Encountered an Error: ${error.message}`)
    }
  }

  function handleMarkAsComplete() { 
    window.alert('Please create a new item before marking it as complete =)');
  }

  return (
    <div className={styles.formModal}>
      <form
        className={styles.form}
        onSubmit={handleAddTodo}
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
                </select> / 
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
                rows="7"
                className={styles.textArea}
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
                className={styles.submitInput}
                value="Save" />
              <button
                type="button"
                name="complete"
                className={styles.button}
                onClick={handleMarkAsComplete}
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

export default AddTodoForm;