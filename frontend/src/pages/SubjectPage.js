import { Component } from "react";
import contactAPI from "../api/contactAPI";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

class SubjectPage extends Component {
  state = {
    subject: null,
  };

  async getSubject() {
    try {
      let subjectId = this.props.match.params.subjectId;
      let token = this.context ? this.context.token : null;
      let subjectData = await contactAPI.getSubjectById(subjectId, token);
      if (subjectData) {
        this.setState({ subject: subjectData });
      }
    } catch (error) {
      console.log(error);
    }
  }

  addContact = async () => {
    try {
      let inputFirstName = document.getElementById("new-contact-first-name");
      let inputLastName = document.getElementById("new-contact-last-name");
      let inputStreet = document.getElementById("new-contact-street");
      let inputCity = document.getElementById("new-contact-city");
      let inputState = document.getElementById("new-contact-state");
      let inputZip = document.getElementById("new-contact-zip");
      let inputPhone = document.getElementById("new-contact-phone");
      let inputEmail = document.getElementById("new-contact-email");
      let token = this.context ? this.context.token : null;

      if (
        inputFirstName &&
        inputLastName &&
        inputStreet &&
        inputCity &&
        inputState &&
        inputZip &&
        inputPhone &&
        inputEmail &&
        token
      ) {
        let newContactParams = {
          subject: this.state.subject.id,
          first_name: inputFirstName.value,
          last_name: inputLastName.value,
          street: inputStreet.value,
          city: inputCity.value,
          state: inputState.value,
          zip: inputZip.value,
          phone: inputPhone.value,
          email: inputEmail.value,
        };
        let data = await contactAPI.createContact(newContactParams, token);
        if (data) {
          this.getSubject();
        }
      }
    } catch {}
  };

  componentDidMount() {
    this.getSubject();
  }

  renderContacts() {
    let contactElements = this.state.subject.contacts.map((contact, index) => {
      return (
        <li key={`contact-${index}`}>
          <Link to={`/contacts/${contact.id}`}>
            {contact.first_name} {contact.last_name}
          </Link>
        </li>
      );
    });

    return <ul className="simple-list">{contactElements}</ul>;
  }

  renderSubject() {
    if (!this.state.subject) {
      return <p>No Contacts Found</p>;
    }

    return (
      <div>
        <h1>{this.state.subject.title}</h1>
        <h3>{this.state.subject.description}</h3>
        {this.renderContacts()}
        <hr />
        <input id="new-contact-first-name" placeholder="first name" />
        <input id="new-contact-last-name" placeholder="last name" />
        <input id="new-contact-street" placeholder="street" />
        <input id="new-contact-city" placeholder="city" />
        <input id="new-contact-state" placeholder="state" />
        <input id="new-contact-zip" placeholder="zip" />
        <input id="new-contact-phone" placeholder="phone" />
        <input id="new-contact-email" placeholder="email" />
        <button onClick={this.addContact}>Add New Contact</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Subject Page: {this.props.match.params.subjectId}</h1>
        {this.renderSubject()}
      </div>
    );
  }
}

SubjectPage.contextType = UserContext;

export default SubjectPage;
