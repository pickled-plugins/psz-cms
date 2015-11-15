import React from 'react';
import { Header } from './../../../general/header.jsx';

import ShowItem from './item.jsx';

import fetch from 'isomorphic-fetch'

class Show extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props);
		this.state = {};
	}


	/*
	 * 
	 *
	 */
	render() {
		var { resource } = this.state
		console.log(this.state)
		return (
			<div className='wrapper__content fill-parent'>
				<Header />
				<ShowItem resource={ resource }/>
			</div>
		);
	}


	/*
	 * If project was passed down in props, no need to fetch again.
	 *
	 */
	componentDidMount() {
		this.fetchResource();
	}


	/*
	 *
	 *
	 */
	fetchResource() {
		var { id } = this.props.params
		fetch(`/api/v2/posts?id=${id}`)
			.then(res => res.json())
			.then((resources) => {
				this.setState({ resource: resources[0] })
			})
	}

}

export default Show