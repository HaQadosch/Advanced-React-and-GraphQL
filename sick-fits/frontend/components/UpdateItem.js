import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import { DisplayError } from './ErrorMessage'
import { injectGlobal } from 'styled-components'

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`
export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
    updateItem(id: $id, title: $title, description: $description, price: $price) {
      id
      title
      description
      price
    }
  }
`

export default class UpdateItem extends Component {
  constructor (...args) {
    super(...args)
    this.state = { }

    this.handleChange = ({ target: { value, name, type } }) => {
      const coerce = type === 'number' ? parseFloat : _ => _
      this.setState({ [name]: coerce(value) })
    }

    this.updateItem = async (evt, updateItemMutation) => {
      evt.preventDefault()
      const res = await updateItemMutation({
        variables: {
          id: this.props.id,
          ...this.state
        }
      })
    }
  }

  render () {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }} >
        { ({ data: { item }, loading }) => {
          if (loading) return <p>Loading...</p>
          if (!item) return <p>No item found for id: {this.props.id}</p>
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state} >
              {
                (updateItem, { loading, error }) => (
                  <Form onSubmit={evt => this.updateItem(evt, updateItem)} >
                    <DisplayError error={error} />
                    <fieldset disabled={loading} aria-busy={loading} >
                      <label htmlFor='title'>Title
                        <input type='text' id='title' name='title' placeholder='title' required defaultValue={item.title} onChange={this.handleChange} />
                      </label>
                      <label htmlFor='description'>Description
                        <textarea type='text' id='description' name='description' placeholder='description' required defaultValue={item.description} onChange={this.handleChange} />
                      </label>
                      <label htmlFor='price'>Price
                        <input type='number' id='price' name='price' placeholder='price' required defaultValue={item.price} onChange={this.handleChange} />
                      </label>
                      <button type='submit'>Sav{loading ? 'ing ' : 'e'} Changes</button>
                    </fieldset>
                  </Form>
                )
              }
            </Mutation>
          )
        } }
      </Query>
    )
  }
}
