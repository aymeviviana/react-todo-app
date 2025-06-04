import React from 'react';
import styles from './UpdateTodoForm.module.css';
import { ENDPOINT } from './constants';


function UpdateTodoForm({ formValues, updateTodo, removeModal }) { 
  const [formData, setFormData] = React.useState(formValues);
  
  function handleChange(event) { 
    const { name, value } = event.target;
    setFormData((currentFormData) => ({...currentFormData, [name]: value}));
  }

  function markTodoAsComplete(event) { 
    handleUpdateTodo(event, true);
  }

  function formatDateValues({ day, month, year }) {
    if (day === "Day") formData.day = "";
    if (month === "Month") formData.month = "";
    if (year === "Year") formData.year = "";
  }

  async function handleUpdateTodo(event, todoCompleted = undefined) {
    event.preventDefault();

    if (todoCompleted) { 
      formData.completed = true;
    }

    formatDateValues(formData);

    try {
      const response = await fetch(`${ENDPOINT}/${formData.id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {"Content-Type": "application/json; charset=UTF-8"},
      });

      if (!response.ok) { 
        throw new Error(`${response.status} ${response.textStatus}`);
      }

      const todo = await response.json();
      updateTodo(todo, todo.id);
      removeModal();
      
    } catch (error) {
      console.log(`Encountered an error: ${error.message}`);
    }
  }


  return (
    <div id={styles.form_modal}>
      <form
        onSubmit={(event) => handleUpdateTodo(event)}
      >
        <fieldset>
          <ul>
            <li>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Item 1"
                value={formData.title}
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="due">Due Date</label>
              <div className={ styles.date }>
                <select
                  id="due"
                  name="day"
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
            <li>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                cols="50"
                name="description"
                rows="7"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              >
              </textarea>
            </li>
            <li>
              <input type="submit" value="Save" />
              <button
                type="button"
                name="complete"
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