import React from 'react';
import PropTypes from 'prop-types';
import './deal-table.scss';

function DealRow(deal) {
  return (
    <tr className="broadband-grid__deal" data-deal-id={deal.id}>
      <td className="broadband-grid__property">{deal.title}</td>
      <td className="broadband-grid__property">£{deal.cost}</td>
    </tr>
  );
}

class DealTable extends React.Component {
  render() {
    return (
      <table className="broadband-grid">
        <thead className="broadband-grid__headings">
          <tr>
            <th>About</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody className="broadband-grid__section">
          {this.props.deals.map(deal => <DealRow {...deal} key={deal.id} />)}
        </tbody>
      </table>
    );
  }
}

DealTable.propTypes = {
  deals: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      productTypes: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired
};

export default DealTable;
