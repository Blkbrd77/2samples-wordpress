/* This section of the code registers a new block, sets an icon and a category, and indicates what type of fields it'll include. */
const { registerBlockType } = wp.blocks;
const { withSelect, select } = wp.data;
const { Component } = wp.element;

class MapSelector extends Component {
	render() {
		const { attributes, setAttributes } = this.props;
    const { posts } = this.props;

    function updateContent(value) {
      setAttributes({map_id: event.target.value})
    }

    if(posts) {
      let options = posts.map(post => React.createElement("option", { value : post.id }, post.title.rendered));
      options.unshift(React.createElement("option", { value : undefined }, "(no map selected)"));
      return React.createElement(
        "div",
        null,
        React.createElement("select", { value: attributes.map_id, onChange: updateContent }, options),
      );
    } else {
      return React.createElement(
        "div",
        null,
        React.createElement("p", {}, "Loading maps..."),
      );
    }
	}
}

registerBlockType('mapster/mapster-select-map-block', {
  title: 'Mapster Map Select',
  icon: 'location-alt',
  description: "Select a Mapster map to add to your post",
  category: 'common',
  keywords : ["map", "mapster", "select"],
  attributes: {
    map_id : { type: 'string' },
  },

/* This configures how the content and color fields will work, and sets up the necessary elements */

  edit : withSelect(select => {
  	const query = { per_page: -1 }
    return {
      posts : select('core').getEntityRecords('postType', 'mapster-wp-map', query)
    }
  })(MapSelector),

  save: () => { return null }
})
