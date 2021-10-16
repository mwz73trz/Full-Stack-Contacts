import { Component } from "react";
import contactAPI from "../api/contactAPI";
import Contact from "../components/Contact";
import UserContext from "../contexts/UserContext";

class ContactPage extends Component {
  static MODE_TYPE = {
    VIEW: 1,
    UPDATE: 2,
  };

  state = {
    contact: null,
    mode: ContactPage.MODE_TYPE.VIEW,
  };

  async getContact() {
    try {
      let contactId = this.props.match.params.contactId;
      let token = this.context ? this.context.token : null;
      let contactData = await contactAPI.getContactById(contactId, token);
      if (contactData) {
        this.setState({ contact: contactData });
      }
    } catch (error) {
      console.log(error);
    }
  }

  changeMode = (newMode) => {
    this.setState({ mode: newMode });
  };

  updateContact = async () => {
    try {
      let inputFirstName = document.getElementById("contact-first-name");
      let inputLastName = document.getElementById("contact-last-name");
      let inputStreet = document.getElementById("contact-street");
      let inputCity = document.getElementById("contact-city");
      let inputState = document.getElementById("contact-state");
      let inputZip = document.getElementById("contact-zip");
      let inputPhone = document.getElementById("contact-phone");
      let inputEmail = document.getElementById("contact-email");

      let contactId = this.state.contact.id;
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
        contactId > 0 &&
        token
      ) {
        let updatedContact = {
          subject: this.state.contact.subject,
          first_name: inputFirstName.value,
          last_name: inputLastName.value,
          street: inputStreet.value,
          city: inputCity.value,
          state: inputState.value,
          zip: inputZip.value,
          phone: inputPhone.value,
          email: inputEmail.value,
        };
        let data = await contactAPI.editContact(
          contactId,
          updatedContact,
          token
        );
        if (data) {
          this.setState({ contact: data });
          this.changeMode(ContactPage.MODE_TYPE.VIEW);
        }
      }
    } catch {}
  };

  deleteContact = async () => {
    try {
      let subjectId = this.state.contact.subject;
      let contactId = this.state.contact.id;
      let token = this.context ? this.context.token : null;
      if (contactId > 0 && token) {
        let result = await contactAPI.deleteContact(contactId, token);
        if (result.success) {
          this.props.history.push(`/subjects/${subjectId}/`);
        }
      }
    } catch {}
  };

  componentDidMount() {
    this.getContact();
  }

  renderContact() {
    if (!this.state.contact) {
      return <p>Contact Not Found!</p>;
    }
    if (this.state.mode === ContactPage.MODE_TYPE.UPDATE) {
      return (
        <div>
          <div>
            <h1 className="nonbreak">First Name: </h1>
            <input
              id="contact-first-name"
              placeholder="first name"
              defaultValue={this.state.contact.first_name}
            />
          </div>
          <div>
            <h1 className="nonbreak">Lastst Name: </h1>
            <input
              id="contact-last-name"
              placeholder="last name"
              defaultValue={this.state.contact.last_name}
            />
          </div>
          <div>
            <h1 className="nonbreak">Street: </h1>
            <input
              id="contact-street"
              placeholder="street"
              defaultValue={this.state.contact.street}
            />
          </div>
          <div>
            <h1 className="nonbreak">City: </h1>
            <input
              id="contact-city"
              placeholder="city"
              defaultValue={this.state.contact.city}
            />
          </div>
          <div>
            <h1 className="nonbreak">State: </h1>
            <input
              id="contact-state"
              placeholder="state"
              defaultValue={this.state.contact.state}
            />
          </div>
          <div>
            <h1 className="nonbreak">Zip Code: </h1>
            <input
              id="contact-zip"
              placeholder="zip"
              defaultValue={this.state.contact.zip}
            />
          </div>
          <div>
            <h1 className="nonbreak">Phone Number: </h1>
            <input
              id="contact-phone"
              placeholder="phone"
              defaultValue={this.state.contact.phone}
            />
          </div>
          <div>
            <h1 className="nonbreak">Email: </h1>
            <input
              id="contact-email"
              placeholder="email"
              defaultValue={this.state.contact.email}
            />
          </div>
          <br />
          <button onClick={this.updateContact}>Save</button>
          <button onClick={() => this.changeMode(ContactPage.MODE_TYPE.VIEW)}>
            Cancel
          </button>
        </div>
      );
    }

    return (
      <div>
        <Contact contact={this.state.contact} />
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Contact Page: {this.props.match.params.contactId}</h1>
        {this.renderContact()}
        <hr />
        <button onClick={() => this.changeMode(ContactPage.MODE_TYPE.UPDATE)}>
          Update
        </button>
        <button onClick={this.deleteContact}>Delete</button>
      </div>
    );
  }
}

ContactPage.contextType = UserContext;

export default ContactPage;
