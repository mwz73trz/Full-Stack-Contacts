import { Component } from "react";

class SubjectList extends Component {
  render() {
    return <span>{this.props.subject.title}</span>;
  }
}

export default SubjectList;
