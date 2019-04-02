import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import { displayError, DisplayError } from './ErrorMessage'
import { injectGlobal } from 'styled-components'

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION($title: String!, $description: String!, $price: Int!, $image: String, $largeImage: String) {
    createItem(title: $title, description: $description, price: $price, image: $image, largeImage: $largeImage) {
      id
    }
  }
`

export default class CreateItem extends Component {
  constructor (...args) {
    super(...args)
    this.state = {
      title: '',
      description: '',
      image: '',
      largeImage: '',
      price: 0
    }

    this.handleChange = ({ target: { value, name, type } }) => {
      const coerce = type === 'number' ? parseFloat : _ => _
      this.setState({ [name]: coerce(value) })
    }

    this.uploadFile = async ({ target: { files } }) => {
      const file = files[0]
      const data = new window.FormData()
      data.append('file', file)
      data.append('upload_preset', 'sickfits')

      const res = await window.fetch('https://api.cloudinary.com/v1_1/dc6zhypaf/image/upload', {
        method: 'POST',
        body: data
      })

      const resFile = await res.json()
      this.setState({
        image: resFile.secure_url,
        largeImage: resFile.eager[0].secure_url
      })
    }
  }

  render () {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state} >
        {
          (createItem, { loading, error }) => (
            <Form onSubmit={
              async e => {
                e.preventDefault()
                const { data: { createItem: { id } } } = await createItem()
                Router.push({
                  pathname: '/item',
                  query: { id }
                })
              }
            } >
              <DisplayError error={error} />
              <fieldset disabled={loading} aria-busy={loading} >
                <label htmlFor='file'>Image
                  <input type='file' id='file' name='file' placeholder='Upload an image' required onChange={this.uploadFile} />
                  {this.state.image && <img src={this.state.image} alt='upload preview' width='100' /> }
                </label>
                <label htmlFor='title'>Title
                  <input type='text' id='title' name='title' placeholder='title' required value={this.state.title} onChange={this.handleChange} />
                </label>
                <label htmlFor='description'>Description
                  <textarea type='text' id='description' name='description' placeholder='description' required value={this.state.description} onChange={this.handleChange} />
                </label>
                <label htmlFor='price'>Price
                  <input type='number' id='price' name='price' placeholder='price' required value={this.state.price} onChange={this.handleChange} />
                </label>
                <button type='submit'>Submit</button>
              </fieldset>
            </Form>
          )
        }
      </Mutation>
    )
  }
}
