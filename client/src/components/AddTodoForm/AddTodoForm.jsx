import React from 'react';
import styles from './AddTodoForm.module.css';
import { ENDPOINT } from '../../constants';

function AddTodoForm({ addTodo, removeModal, resetActiveGroup }) { 
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
      removeModal();
      addTodo(todo);
      resetActiveGroup();
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
                  <option value="01">1</option>
                  <option value="02">2</option>
                  <option value="03">3</option>
                  <option value="04">4</option>
                  <option value="05">5</option>
                  <option value="06">6</option>
                  <option value="07">7</option>
                  <option value="08">8</option>
                  <option value="09">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>  /
                <select
                  id="due_month"
                  name="month"
                  className={styles.selectDate}
                  value={formData.month}
                  onChange={handleChange}
                >
                  <option>Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
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
                  <option>2014</option>
                  <option>2015</option>
                  <option>2016</option>
                  <option>2017</option>
                  <option>2018</option>
                  <option>2019</option>
                  <option>2020</option>
                  <option>2021</option>
                  <option>2022</option>
                  <option>2023</option>
                  <option>2024</option>
                  <option>2025</option>
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