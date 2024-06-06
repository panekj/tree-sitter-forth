package tree_sitter_forth_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-forth"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_forth.Language())
	if language == nil {
		t.Errorf("Error loading Forth grammar")
	}
}
