import React from "react";
import styled from "styled-components";
interface ILIST {
  readonly listTemplates: IListType;
  readonly listData: any;
  readonly editHandler?: any;
  readonly deleteHandler?: any;
  readonly rowClick?: any; 
  readonly disableHandler?: any; 
  readonly enableHandler?: any;
  readonly manageHandler?: any;
  readonly popupHandler?: any;
}
interface IListType {
  readonly thead: any;
  readonly tbody: any;
  readonly actionItems?: any;
  readonly link?: any;
}
const A = styled.a`
  color: #337ab7;
  cursor: pointer;
`;
const AA = styled.span`
  color: #123145;
  cursor: pointer;
`;
class List extends React.Component<ILIST, any> {
  getTableHead = () => {
    const { thead, actionItems } = this.props.listTemplates;
    return (
      <>
        {thead.map((row: any, index: any) => (
          <th scope="col" key={index}>
            {row}
          </th>
        ))}
        {actionItems && actionItems.edit ? <th scope="col"></th> : null}
        {actionItems && actionItems.delete ? <th scope="col"></th> : null}
        {actionItems && actionItems.disable ? <th scope="col"></th> : null}
        {actionItems && actionItems.enable ? <th scope="col"></th> : null}
        {actionItems && actionItems.seen ? <th scope="col"></th> : null}
      </>
    );
  };
  getTableBody = () => {
    const { tbody, actionItems, link } = this.props.listTemplates;
    const { listData } = this.props;
    return (
      <>
        {listData.map((list: any, index: any) => (
          <tr
            key={index}
            onClick={() => this.props.rowClick && this.props.rowClick(list)}
            style={this.props.rowClick ? { cursor: "pointer" } : {}}
          >
            {tbody.map((row: any, index: any) => (
              <>
                <td scope="col" key={index}>
                  {index === 0 && link ? <AA>{list[row]}</AA> : list[row]}
                </td>
              </>
            ))}
            {actionItems && actionItems.edit && this.props.editHandler ? (
              <td scope="col">
                <A href={void 0} onClick={() => this.props.editHandler(list)}>
                  <i className="zmdi zmdi-edit"></i>
                </A>
              </td>
            ) : null}

            {actionItems && actionItems.disable && this.props.disableHandler ? (
              <td scope="col">
                <A href={void 0} onClick={() => this.props.disableHandler(list)}>
                  <i className="zmdi zmdi-block"></i>
                </A>
              </td>
            ) : null}

            {actionItems && actionItems.enable && this.props.enableHandler ? (
              <td scope="col">
                <A href={void 0} onClick={() => this.props.enableHandler(list)}>
                  <i className="zmdi zmdi-rotate-right"></i>
                </A>
              </td>
            ) : null}


            
              {actionItems && actionItems.enable && this.props.popupHandler ? (
              <td scope="col">
                <A href={void 0} onClick={() => this.props.popupHandler(list)}>
                  <i className="zmdi zmdi-rotate-right"></i>
                </A>
              </td>
            ) : null}

            
            {actionItems && actionItems.edit && this.props.manageHandler ? (
              <td scope="col">
                <A href={void 0} onClick={() => this.props.manageHandler(list)}>
                  <i className="zmdi zmdi-edit"></i>
                </A>
              </td>
            ) : null}

            {actionItems &&
            actionItems.delete &&
            this.props.deleteHandler &&
            list["allowStaffDeletion"] !== false ? (
              <td scope="col">
                <A href={void 0} onClick={() => this.props.deleteHandler(list)}>
                  <i className="zmdi zmdi-delete"></i>
                </A>
              </td>
            ) : null}
          </tr>
        ))}
      </>
    );
  };
  render() {
    return (
      <table id="tstaff" className="table">
        <thead>
          <tr style={{ color: "#123145" }}>{this.getTableHead()}</tr>
        </thead>
        <tbody>{this.getTableBody()}</tbody>
      </table>
    );
  }
}
export default List;
