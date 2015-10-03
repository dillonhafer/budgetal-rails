var ImportModal = React.createClass({
	render: function() {
		return (
			<div className='reveal-modal tiny' id='copy-modal' data-reveal>
        <h2 className='text-center'>Import</h2>
        <hr />
        <p>Do you want to import budget items from your previous month's  c.name  category?</p>
        <div>
          link_to 'Import',
                      category_copy_path(c),
                      class: 'button radius small expand'
        </div>
        <a className="close-reveal-modal" aria-label="Close">&#215;</a>
      </div>
		)
	}
})