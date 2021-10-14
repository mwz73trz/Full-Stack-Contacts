import { Component } from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";

class Contact extends Component {
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>
            {this.props.contact.first_name} {this.props.contact.last_name}
          </CardTitle>
          <CardText>Street: {this.props.contact.street}</CardText>
          <CardText>City: {this.props.contact.city}</CardText>
          <CardText>State: {this.props.contact.state}</CardText>
          <CardText>Zip Code: {this.props.contact.zip}</CardText>
          <CardText>Phone Number: {this.props.contact.phone}</CardText>
          <CardText>Email: {this.props.contact.email}</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default Contact;
