import React from 'react';

class Recommendation extends React.Component {
  state = {
    category: '',
    taste: ''
  };

  handleCategoryClick = (category) => {
    this.setState({ category });
  };

  handleTasteClick = (taste) => {
    this.setState({ taste }, () => {
      const { category, taste } = this.state;
      console.log([category, taste]);
    });
  };

  render() {
    const { category, taste } = this.state;

    if (!category) {
      return (
        <div>
          <button onClick={() => this.handleCategoryClick('탁주')}>탁주</button>
          <button onClick={() => this.handleCategoryClick('약청주')}>약청주</button>
          <button onClick={() => this.handleCategoryClick('증류주')}>증류주</button>
          <button onClick={() => this.handleCategoryClick('과실주')}>과실주</button>
        </div>
      );
    }

    return (
      <div>
        <button onClick={() => this.handleTasteClick('단맛')}>단맛</button>
        <button onClick={() => this.handleTasteClick('쓴맛')}>쓴맛</button>
        <button onClick={() => this.handleTasteClick('신맛')}>신맛</button>
        <button onClick={() => this.handleTasteClick('깊은맛')}>깊은맛</button>
        <p>선택된 카테고리: {category}</p>
        <p>선택된 맛: {taste}</p>
      </div>
    );
  }
}

export default Recommendation;
