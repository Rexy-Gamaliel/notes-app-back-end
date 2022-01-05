const { nanoid } = require('nanoid')
const notes = require('./notes')

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload

  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newNote = {
    id, title, tags, createdAt, updatedAt, body
  }

  notes.push(newNote)

  const isSuccess = notes.filter((note) => note.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'New note added successfully',
      data: {
        noteId: id
      }
    })
    response.code(201)
    return response
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Failed adding new note'
    })
    response.code(500)
    return response
  }
}

const getAllNotesHandler = (request, h) => ({
  status: 'success',
  data: {
    notes
  }
})

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params
  const note = notes.filter((note) => note.id === id)[0]

  if (note !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        note
      }
    })
    response.code(200)
    return response
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Note not found'
    })
    response.code(404)
    return response
  }
}

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params
  const { title, tags, body } = request.payload
  const updatedAt = new Date().toISOString()

  const index = notes.findIndex((note) => note.id === id)

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    }

    const response = h.response({
      status: 'success',
      message: 'Note changed successfully'
    })
    response.code(200)
    return response
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Failed to change note. Note not found'
    })
    response.code(404)
    return response
  }
}

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params

  const index = notes.findIndex((note) => note.id === id)

  if (index !== -1) {
    notes.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Note deleted successfully'
    })
    response.code(200)
    return response
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Failed to delete note. Note not found'
    })
    response.code(404)
    return response
  }
}

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler }
